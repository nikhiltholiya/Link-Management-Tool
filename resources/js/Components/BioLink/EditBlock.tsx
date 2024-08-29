import Input from "../Input";
import TextArea from "../TextArea";
import EditPen from "../Icons/EditPen";
import InputDropdown from "../InputDropdown";
import { LinkItemProps, PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Button, Dialog } from "@material-tailwind/react";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { vimeoUrl, spotifyUrl, youTubeUrl, soundCloudUrl } from "@/utils/utils";

interface Props {
   block: LinkItemProps;
}

const EditBlock = (props: Props) => {
   const { block } = props;
   const page = usePage<PageProps>();
   const { app, input } = page.props.translate;
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const { post, data, setData, errors, reset } = useForm({
      link_id: block.link_id,
      item_type: block.item_type,
      item_sub_type: block.item_sub_type,
      item_title: block.item_title,
      item_link: block.item_link,
      item_icon: block.item_icon,
      content: block.content,
      image: null,
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const files = e.target.files;
      if (files && files[0]) {
         setData("image", files[0] as any);
      }
   };

   const submit: FormEventHandler = async (e) => {
      e.preventDefault();

      post(route("biolink-block.update", { id: block.id }), {
         onSuccess() {
            setOpen(false);
         },
      });
   };

   return (
      <>
         <EditPen
            onClick={handleOpen}
            className="h-5 w-5 cursor-pointer text-blue-500"
         />

         <Dialog
            size="sm"
            open={open}
            handler={handleOpen}
            className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
         >
            <div className="flex items-center justify-between mb-6">
               <p className="text-xl font-medium">{block.item_title}</p>
               <span
                  onClick={handleOpen}
                  className="text-3xl leading-none cursor-pointer"
               >
                  ×
               </span>
            </div>

            <form onSubmit={submit}>
               {block.item_icon === "Link" ? (
                  <>
                     <div className="mb-4">
                        <Input
                           type="text"
                           name="item_title"
                           label={input.link_title}
                           value={data.item_title}
                           onChange={onHandleChange}
                           placeholder={input.link_title_placeholder}
                           error={errors.item_title}
                           fullWidth
                           required
                        />
                     </div>
                     <div className="mb-4">
                        <Input
                           type="url"
                           name="item_link"
                           label={input.link_url}
                           value={data.item_link as any}
                           onChange={onHandleChange}
                           placeholder={input.link_url_placeholder}
                           error={errors.item_link}
                           fullWidth
                           required
                        />
                     </div>
                  </>
               ) : block.item_icon === "Heading" ? (
                  <>
                     <div className="mb-4 relative z-10">
                        <InputDropdown
                           fullWidth
                           required
                           name="item_sub_type"
                           label={input.heading_type}
                           defaultValue={data.item_sub_type as string}
                           error={errors.item_sub_type}
                           itemList={[
                              { key: "H1", value: "h1" },
                              { key: "H2", value: "h2" },
                              { key: "H3", value: "h3" },
                              { key: "H4", value: "h4" },
                              { key: "H5", value: "h5" },
                              { key: "H6", value: "h6" },
                           ]}
                           onChange={(e) =>
                              setData("item_sub_type", e.value as any)
                           }
                        />
                     </div>
                     <div className="mb-4">
                        <Input
                           type="text"
                           name="item_title"
                           label={input.heading_text}
                           value={data.item_title}
                           onChange={onHandleChange}
                           error={errors.item_title}
                           placeholder={input.heading_text_placeholder}
                           fullWidth
                           required
                        />
                     </div>
                  </>
               ) : block.item_icon === "Paragraph" ? (
                  <>
                     <div className="mb-4">
                        <Input
                           type="text"
                           label={input.title}
                           name="item_title"
                           value={data.item_title as any}
                           onChange={(event: any) => {
                              setData((prev: any) => ({
                                 ...prev,
                                 item_sub_type: "paragraph",
                                 item_title: event.target.value,
                              }));
                           }}
                           placeholder={input.title_placeholder}
                           error={errors.item_title}
                           fullWidth
                           required
                        />
                     </div>
                     <div className="mb-4">
                        <TextArea
                           rows={6}
                           cols={10}
                           name="content"
                           label={input.description}
                           value={data.content as any}
                           onChange={onHandleChange}
                           placeholder={input.description_placeholder}
                           error={errors.content}
                           fullWidth
                           required
                        />
                     </div>
                  </>
               ) : block.item_icon === "Image" ? (
                  <>
                     <div className="mb-4">
                        <label className="block text-sm mb-2 font-medium text-gray-500">
                           {input.select_image}
                        </label>
                        <input
                           type="file"
                           onChange={handleImageChange}
                           className="!h-10 !p-0 outline-none focus:outline-none"
                        />
                        {errors.image && (
                           <p className="text-sm text-red-500 mt-1">
                              {errors.image}
                           </p>
                        )}
                     </div>
                     <div className="mb-4">
                        <Input
                           type="text"
                           name="item_title"
                           label={input.image_alt}
                           value={data.item_title}
                           onChange={onHandleChange}
                           error={errors.item_title}
                           placeholder={input.image_alt_placeholder}
                           fullWidth
                           required
                        />
                     </div>
                     <div className="mb-4">
                        <Input
                           type="text"
                           name="item_link"
                           value={data.item_link as any}
                           onChange={onHandleChange}
                           placeholder={input.image_url_placeholder}
                           label={input.image_url}
                           error={errors.item_link}
                           fullWidth
                        />
                     </div>
                  </>
               ) : block.item_icon === "SoundCloud" ? (
                  <div>
                     <p className="text-gray-500 text-sm mb-3">
                        Paste in your Soundcloud URL and we will show it as a
                        playable song on your profile.
                     </p>
                     {/* -------------------------- */}
                     <div className="mb-4">
                        <Input
                           type="text"
                           name="item_title"
                           label={input.video_title}
                           value={data.item_title}
                           onChange={onHandleChange}
                           placeholder={input.video_title_placeholder}
                           error={errors.item_title}
                           fullWidth
                           required
                        />
                     </div>
                     <Input
                        type="url"
                        name="item_link"
                        value={data.item_link as any}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           const url = soundCloudUrl(e.target.value);
                           setData("item_link", url as any);
                        }}
                        placeholder={input.video_url_placeholder}
                        label={input.sound_cloud_video_url}
                        error={errors.item_link}
                        fullWidth
                        required
                     />
                  </div>
               ) : block.item_icon === "YouTube" ? (
                  <div>
                     <p className="text-gray-500 text-sm mb-3">
                        Paste in your YouTube video URL and we will show it as a
                        video on your profile.
                     </p>
                     <div className="mb-4">
                        <Input
                           type="text"
                           name="item_title"
                           label={input.video_title}
                           value={data.item_title}
                           onChange={onHandleChange}
                           placeholder={input.video_title_placeholder}
                           error={errors.item_title}
                           fullWidth
                           required
                        />
                     </div>
                     <Input
                        type="url"
                        name="item_link"
                        value={data.item_link as any}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           const url = youTubeUrl(e.target.value);
                           setData("item_link", url as any);
                        }}
                        placeholder={input.video_url_placeholder}
                        label={input.youtube_video_url}
                        error={errors.item_link}
                        fullWidth
                        required
                     />
                  </div>
               ) : block.item_icon === "Spotify" ? (
                  <div>
                     <p className="text-gray-500 text-sm mb-3">
                        Paste in your Spotify Song, Album, Show or Episode URL
                        and we will show it as a player on your profile.
                     </p>
                     <div className="mb-4">
                        <Input
                           type="text"
                           name="item_title"
                           label={input.video_title}
                           value={data.item_title}
                           onChange={onHandleChange}
                           placeholder={input.video_title_placeholder}
                           error={errors.item_title}
                           fullWidth
                           required
                        />
                     </div>
                     <Input
                        type="url"
                        name="item_link"
                        value={data.item_link as any}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           const url = spotifyUrl(e.target.value);
                           setData("item_link", url as any);
                        }}
                        placeholder={input.video_url_placeholder}
                        label={input.spotify_video_url}
                        error={errors.item_link}
                        fullWidth
                        required
                     />
                  </div>
               ) : block.item_icon === "Vimeo" ? (
                  <div>
                     <p className="text-gray-500 text-sm mb-3">
                        Paste in your Vimeo URL and we will show it as a video
                        on your profile.
                     </p>
                     <div className="mb-4">
                        <Input
                           type="text"
                           name="item_title"
                           label={input.video_title}
                           value={data.item_title}
                           onChange={onHandleChange}
                           placeholder={input.video_title_placeholder}
                           error={errors.item_title}
                           fullWidth
                           required
                        />
                     </div>
                     <Input
                        type="url"
                        name="item_link"
                        value={data.item_link as any}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           const url = vimeoUrl(e.target.value);
                           setData("item_link", url as any);
                        }}
                        placeholder={input.video_url_placeholder}
                        label={input.vimeo_video_url}
                        error={errors.item_link}
                        fullWidth
                        required
                     />
                  </div>
               ) : block.item_icon === "TikTok" ? (
                  <div>
                     <p className="text-gray-500 text-sm mb-3">
                        Paste in your TikTok Video URL and we will show it as a
                        video on your profile.
                     </p>
                     <div className="mb-4">
                        <Input
                           type="text"
                           name="item_title"
                           label={input.video_title}
                           value={data.item_title}
                           onChange={onHandleChange}
                           placeholder={input.video_title_placeholder}
                           error={errors.item_title}
                           fullWidth
                           required
                        />
                     </div>
                     <Input
                        type="url"
                        name="item_link"
                        value={data.item_link as any}
                        onChange={onHandleChange}
                        placeholder={input.video_url_placeholder}
                        label={input.tiktok_video_url}
                        error={errors.item_link}
                        fullWidth
                        required
                     />
                  </div>
               ) : null}

               <div className="flex justify-end mt-4">
                  <Button
                     color="red"
                     variant="text"
                     onClick={handleOpen}
                     className="py-2 font-medium capitalize text-base mr-2"
                  >
                     <span>{app.cancel}</span>
                  </Button>
                  <Button
                     type="submit"
                     color="blue"
                     variant="gradient"
                     className="py-2 font-medium capitalize text-base"
                  >
                     <span>{app.save_changes}</span>
                  </Button>
               </div>
            </form>
         </Dialog>
      </>
   );
};

export default EditBlock;
