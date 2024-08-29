import {
   Accordion,
   AccordionBody,
   AccordionHeader,
} from "@material-tailwind/react";
import { LinkItemProps } from "@/types";
import { useState } from "react";
import icons from "../Icons";
import RightArrow from "../Icons/RightArrow";

interface Props {
   item: LinkItemProps;
   buttonStyle: any;
}

const LinkBlock = (props: Props) => {
   const { item, buttonStyle } = props;
   const [openAcc, setOpenAcc] = useState(false);
   const handleOpenAcc = () => setOpenAcc((cur) => !cur);
   const Icon = icons[item.item_icon];

   return (
      <>
         {item.item_icon === "Link" ? (
            <a
               key={item.id}
               target="_blank"
               href={item.item_link as any}
               className="font-medium flex items-center justify-between p-4 my-4"
               style={buttonStyle}
            >
               <Icon className="w-5 h-5" />
               {item.item_title}
               <span></span>
            </a>
         ) : item.item_icon === "Heading" ? (
            <div className="p-4 my-4 text-center">
               {item.item_sub_type === "h1" ? (
                  <h1>{item.item_title}</h1>
               ) : item.item_sub_type === "h2" ? (
                  <h2>{item.item_title}</h2>
               ) : item.item_sub_type === "h3" ? (
                  <h3>{item.item_title}</h3>
               ) : item.item_sub_type === "h4" ? (
                  <h4>{item.item_title}</h4>
               ) : item.item_sub_type === "h5" ? (
                  <h5>{item.item_title}</h5>
               ) : item.item_sub_type === "h6" ? (
                  <h6>{item.item_title}</h6>
               ) : null}
            </div>
         ) : (
            <Accordion
               key={item.id}
               open={openAcc}
               className="card my-4"
               style={buttonStyle}
            >
               <AccordionHeader
                  onClick={handleOpenAcc}
                  className="border-b-0 text-md pl-4"
               >
                  <div className="w-full font-medium flex items-center justify-between">
                     <Icon className="w-5 h-5" />
                     <p>{item.item_title}</p>
                     <RightArrow
                        className={`transition duration-300 ${
                           openAcc ? "rotate-90" : "rotate-0"
                        }`}
                     />
                  </div>
               </AccordionHeader>
               <AccordionBody className="p-3">
                  {item.item_icon === "Image" ? (
                     <>
                        {item.item_link ? (
                           <a href={item.item_link} target="_blank">
                              <img
                                 src={item.content as string}
                                 alt={item.item_title}
                                 className="rounded"
                              />
                           </a>
                        ) : (
                           <img
                              src={item.content as string}
                              alt={item.item_title}
                              className="rounded"
                           />
                        )}
                     </>
                  ) : item.item_icon === "Paragraph" ? (
                     <p className="font-normal text-justify">{item.content}</p>
                  ) : null}

                  {item.item_type === "Embed" && item.item_link && (
                     <>
                        {item.item_icon === "TikTok" ? (
                           <blockquote
                              cite={item.item_link}
                              data-video-id={item.item_link
                                 .split("video")
                                 .pop()
                                 ?.slice(1)}
                              className="tiktok-embed w-full h-auto"
                           >
                              <section></section>
                              <script
                                 async
                                 src="https://www.tiktok.com/embed.js"
                              ></script>
                           </blockquote>
                        ) : (
                           <iframe
                              width="100%"
                              height="200"
                              allowFullScreen
                              src={item.item_link}
                              className="rounded"
                           ></iframe>
                        )}
                     </>
                  )}
               </AccordionBody>
            </Accordion>
         )}
      </>
   );
};

export default LinkBlock;
