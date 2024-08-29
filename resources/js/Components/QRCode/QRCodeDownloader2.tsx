import {
   Menu,
   MenuItem,
   MenuList,
   MenuHandler,
   IconButton,
} from "@material-tailwind/react";
import Download from "../Icons/Download";

interface Props {
   imageBlogData: string;
}

const QRCodeDownloader2 = (props: Props) => {
   const { imageBlogData } = props;

   function qrcodeDownload(base64Data: string, format: string) {
      // Convert base64 to binary
      const binaryData = atob(base64Data.split(",")[1]);

      // Create Uint8Array from binary data
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
         uint8Array[i] = binaryData.charCodeAt(i);
      }

      // Create Blob from Uint8Array
      const blob = new Blob([uint8Array], { type: `image/${format}` });

      // Create URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `qrcode.${format}`;
      link.click();

      // Clean up the URL object after download
      URL.revokeObjectURL(url);

      // Remove the anchor element after download
      setTimeout(() => {
         document.body.removeChild(link);
      }, 0);
   }

   return (
      <Menu placement="bottom-end">
         <MenuHandler>
            <IconButton
               variant="text"
               color="white"
               className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-50 active:bg-blue-50 text-blue-500"
            >
               <Download className="h-4 w-4" />
            </IconButton>
         </MenuHandler>

         <MenuList className="min-w-[120px]">
            <MenuItem onClick={() => qrcodeDownload(imageBlogData, "png")}>
               PNG
            </MenuItem>
            <MenuItem onClick={() => qrcodeDownload(imageBlogData, "jpeg")}>
               JPEG
            </MenuItem>
         </MenuList>
      </Menu>
   );
};

export default QRCodeDownloader2;
