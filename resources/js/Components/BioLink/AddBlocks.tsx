import Input from "../Input";
import TextArea from "../TextArea";
import LeftArrow from "../Icons/LeftArrow";
import InputDropdown from "../InputDropdown";
import { LinkProps, PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Button, Dialog } from "@material-tailwind/react";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { soundCloudUrl, spotifyUrl, vimeoUrl, youTubeUrl } from "@/utils/utils";

interface Props {
   link: LinkProps;
   itemPosition: number;
}

const AddBlocks = (props: Props) => {
   const { link, itemPosition } = props;
   const page = usePage<PageProps>();
   const { app, input } = page.props.translate;

   const [open, setOpen] = useState({ parent: false, child: false });
   const [block, setBlock] = useState({ title: "", type: "", content: "" });

   const handleOpen = (newState: {}) => {
      setOpen((prev) => ({
         ...prev,
         ...newState,
      }));
   };

   const { post, data, setData, errors, reset } = useForm({
      image: null,
      link_id: link.id,
      item_position: itemPosition + 1,
      item_type: "",
      item_sub_type: null,
      item_title: "",
      item_link: null,
      item_icon: "",
      content: null,
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

      post(route("biolink-block.store"), {
         onSuccess() {
            setOpen({ parent: false, child: false });
         },
      });
   };

   const blockItems = [
      { title: "Link", type: "linkItem", content: "Link" },
      { title: "Heading", type: "headingItem", content: "Text" },
      { title: "Paragraph", type: "paragraphItem", content: "Text" },
      { title: "Image", type: "imageItem", content: "Image" },
      { title: "SoundCloud", type: "soundCloudItem", content: "Embed" },
      { title: "YouTube", type: "youTubeItem", content: "Embed" },
      { title: "Spotify", type: "spotifyItem", content: "Embed" },
      { title: "Vimeo", type: "vimeoItem", content: "Embed" },
      { title: "TikTok", type: "tiktokItem", content: "Embed" },
   ];

   return (
      <>
         <Button
            variant="text"
            color="white"
            onClick={() => handleOpen({ parent: true })}
            className="py-2 px-3 md:px-4 rounded-md bg-blue-500 active:bg-blue-500 hover:bg-blue-500 font-medium text-base shadow-sm shadow-blue-500/20 active:opacity-[0.85] capitalize whitespace-nowrap"
         >
            {app.add_block}
         </Button>

         <Dialog
            size="sm"
            open={open.parent}
            handler={() => handleOpen({ parent: false })}
            className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
         >
            <div className="flex items-center justify-between mb-6">
               <p className="text-xl font-medium">{app.biolink_blocks}</p>
               <span
                  onClick={() => handleOpen({ parent: false })}
                  className="text-3xl leading-none cursor-pointer"
               >
                  ×
               </span>
            </div>

            {blockItems.map((item) => (
               <Button
                  variant="text"
                  color="white"
                  key={item.type}
                  onClick={() => {
                     reset();
                     setBlock(item);
                     handleOpen({ parent: false, child: true });
                     setData((prev: any) => ({
                        ...prev,
                        item_icon: item.title,
                        item_type: item.content,
                     }));
                  }}
                  className="py-2.5 px-4 block w-full my-4 rounded-md bg-gray-100 active:bg-gray-100 hover:bg-gray-200/80 font-medium text-base shadow-sm shadow-gray-100/20 active:opacity-[0.85] capitalize text-gray-800"
               >
                  {item.title}
               </Button>
            ))}
         </Dialog>

         <Dialog
            size="sm"
            open={open.child}
            handler={() => handleOpen({ child: false })}
            className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
         >
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center">
                  <div
                     onClick={() => {
                        reset();
                        handleOpen({ parent: true, child: false });
                     }}
                     className="flex items-center cursor-pointer w-10"
                  >
                     <LeftArrow className="w-6 h-6" />
                     <LeftArrow className="w-6 h-6 -ml-4" />
                  </div>
                  <p className="text-xl font-medium">{app.add_block}</p>
               </div>
               <span
                  onClick={() => handleOpen({ child: false })}
                  className="text-3xl leading-none cursor-pointer"
               >
                  ×
               </span>
            </div>

            <form onSubmit={submit}>
               {block.type === "linkItem" ? (
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
               ) : block.type === "headingItem" ? (
                  <>
                     <div className="mb-4 relative z-10">
                        <InputDropdown
                           fullWidth
                           required
                           name="item_sub_type"
                           label={input.heading_type}
                           error={errors.item_sub_type}
                           defaultValue={"h1"}
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
                           placeholder={input.heading_text_placeholder}
                           error={errors.item_title}
                           fullWidth
                           required
                        />
                     </div>
                  </>
               ) : block.type === "paragraphItem" ? (
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
               ) : block.type === "imageItem" ? (
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
                           placeholder={input.image_alt_placeholder}
                           error={errors.item_title}
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
                           error={errors.item_link}
                           placeholder={input.image_url_placeholder}
                           label={input.image_url}
                           fullWidth
                        />
                     </div>
                  </>
               ) : block.type === "soundCloudItem" ? (
                  <div>
                     <p className="text-gray-500 text-sm mb-3">
                        Paste in your Soundcloud URL it will show as a playable
                        song on your profile.
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
               ) : block.type === "youTubeItem" ? (
                  <div>
                     <p className="text-gray-500 text-sm mb-3">
                        Paste in your YouTube video URL it will show as a video
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
               ) : block.type === "spotifyItem" ? (
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
               ) : block.type === "vimeoItem" ? (
                  <div>
                     <p className="text-gray-500 text-sm mb-3">
                        Paste in your Vimeo URL it will show as a video on your
                        profile.
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
               ) : block.type === "tiktokItem" ? (
                  <div>
                     <p className="text-gray-500 text-sm mb-3">
                        Paste in your TikTok Video URL it will show as a video
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
                     onClick={() => handleOpen({ child: false })}
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

export default AddBlocks;
