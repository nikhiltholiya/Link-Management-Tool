import { LinkProps, PaginationProps } from "@/types";
import { socialType } from "./data/socials-links";
import axios from "axios";

export function stringToCss(strStyle: string) {
   const parsedStyle: any = {};

   // Parse the CSS string
   strStyle.split(";").forEach((declaration) => {
      const [property, value] = declaration.split(":");
      if (property && value) {
         parsedStyle[property.trim()] = value.trim();
      }
   });

   return parsedStyle;
}

export function jsxStyle(styles: {
   [key: string]: string;
}): React.CSSProperties {
   const inlineStyles: any = {};
   for (const key in styles) {
      if (styles.hasOwnProperty(key)) {
         const propKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
         inlineStyles[propKey] = styles[key];
      }
   }
   return inlineStyles;
}

export function getLink(link: LinkProps, name: string): string {
   if (link.socials) {
      const socials: socialType[] = JSON.parse(link.socials);
      const value = socials.find((item) => item.name === name);
      if (value && value.link) {
         return value.link;
      } else {
         return "";
      }
   } else {
      return "";
   }
}

export const soundCloudUrl = (url: string) => {
   return `https://w.soundcloud.com/player/?url=${url}&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true`;
};

export const youTubeUrl = (url: string) => {
   let lastUrl: any = url.split("/").pop();
   const videoId = lastUrl.split("=").pop();
   return `https://www.youtube.com/embed/${videoId}`;
};

export const spotifyUrl = (url: string) => {
   let urlArray = url.split("/");
   let videoId: any = urlArray.pop();
   const videoType = urlArray.pop();
   const videoUrl = `${videoType}/${videoId.split("?")[0]}`;
   return `https://open.spotify.com/embed/${videoUrl}`;
};

export const vimeoUrl = (url: string) => {
   const lastUrl = url.split("/").pop();
   return `https://player.vimeo.com/video/${lastUrl}`;
};

export const pageChange = (
   current: PaginationProps,
   previous: PaginationProps
) => {
   let changed = false;
   const curLength = current.data.length;
   const prevLength = previous.data.length;

   if (curLength > prevLength || curLength < prevLength) {
      changed = true;
   } else {
      for (let i = 0; i < curLength; i++) {
         const newItem = current.data[i];
         const prevItem = previous.data[i];
         if (newItem.id !== prevItem.id) {
            changed = true;
            break;
         }
      }
   }

   if (current.data[0] && current.data[0].qrcode) {
      changed = true;
   }

   return changed;
};

export const formats = [
   "font",
   "size",
   "bold",
   "italic",
   "underline",
   "strike",
   "color",
   "background",
   "script",
   "header",
   "blockquote",
   "code-block",
   "indent",
   "list",
   "direction",
   "align",
   "link",
   "image",
   "video",
   "formula",
];

// Assume this function is triggered on a button click or similar action
export function fileExporter(path: string) {
   axios
      .get(path)
      .then((response) => {
         const url = window.URL.createObjectURL(new Blob([response.data]));
         const filename = response.headers["filename"];
         const link = document.createElement("a");
         link.href = url;
         link.setAttribute("download", filename);
         document.body.appendChild(link);
         link.click();
      })
      .catch((error) => {
         console.error("Error while downloading CSV:", error);
      });
}
