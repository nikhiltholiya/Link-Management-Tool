import { Button } from "@material-tailwind/react";
import InputDropdown from "../InputDropdown";
import { useState } from "react";

interface Props {
   buttonText: string;
   imageBlogData: () => any;
}

const QRCodeDownloader = (props: Props) => {
   const { buttonText, imageBlogData } = props;
   const [downloadType, setDownloadType] = useState("png");

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
      <>
         <div className="flex items-center border border-blue-500 bg-blue-500 rounded-md">
            <Button
               type="button"
               variant="text"
               color="white"
               onClick={() => qrcodeDownload(imageBlogData(), downloadType)}
               className="w-full py-2.5 px-1 border-none rounded-md rounded-r-none font-medium capitalize text-sm hover:shadow-none"
            >
               {buttonText}
            </Button>

            <InputDropdown
               name="qr_download"
               defaultValue="png"
               itemList={[
                  { key: "PNG", value: "png" },
                  { key: "JPEG", value: "jpeg" },
               ]}
               onChange={(e: any) => setDownloadType(e.value)}
               className="!w-20 rounded-l-none border-none outline-none bg-blue-600 text-white font-medium"
            />
         </div>
      </>
   );
};

export default QRCodeDownloader;
