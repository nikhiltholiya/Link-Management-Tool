import icons from "../Icons";
import Move from "../Icons/Move";
import { useRef } from "react";
import { LinkProps } from "@/types";
import { router } from "@inertiajs/react";
import DeleteBlock from "./DeleteBlock";
import EditBlock from "./EditBlock";
import hideProgress from "@/utils/hideProgress";

interface Props {
   link: LinkProps;
}

const LinkBlocks = (props: Props) => {
   const { link } = props;
   const bioLinkItemsRef = useRef<HTMLDivElement>(null);

   const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
      e.currentTarget.classList.add("dragging");
   };

   const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
      e.currentTarget.classList.remove("dragging");

      const bioLink = document.getElementById("bioLinkItems");
      if (bioLink) {
         const elements = bioLink.getElementsByTagName("div");
         const updatedLinkItemPosition = [];

         for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const id = parseInt(element.dataset.item_id || "");
            if (id) updatedLinkItemPosition.push({ id, position: i + 1 });
         }

         hideProgress();
         router.put(route("biolink-block.position", { id: link.id }), {
            linkItems: updatedLinkItemPosition,
         });
      }
   };

   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(
         bioLinkItemsRef.current!,
         e.clientY
      );
      const draggable: any = document.querySelector(".dragging");

      if (afterElement == null) {
         bioLinkItemsRef.current?.appendChild(draggable);
      } else {
         bioLinkItemsRef.current?.insertBefore(draggable, afterElement);
      }
   };

   const getDragAfterElement = (
      container: HTMLElement,
      y: number
   ): HTMLElement | null => {
      const draggableElements = [
         ...container.querySelectorAll<HTMLElement>(
            ".draggable:not(.dragging)"
         ),
      ];

      return draggableElements.reduce(
         (closest: any, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
               return { offset: offset, element: child };
            } else {
               return closest;
            }
         },
         { offset: Number.NEGATIVE_INFINITY, element: null }
      ).element;
   };

   return (
      <div
         id="bioLinkItems"
         className="bioLinkItems"
         ref={bioLinkItemsRef}
         onDragOver={handleDragOver}
      >
         {link.items.map((item) => {
            const Icon = icons[item.item_icon];
            return (
               <div
                  draggable
                  key={item.id}
                  data-item_id={item.id}
                  className="draggable flex items-center mb-6"
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
               >
                  <Move id="elementMove" className="w-6 h-6 cursor-grab mr-6" />
                  <div className="w-full card p-5 flex items-center justify-between font-medium">
                     <Icon className="w-5 h-5" />
                     <span>{item.item_title}</span>
                     <div className="flex items-center">
                        <EditBlock block={item} />
                        <DeleteBlock block={item} />
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
};

export default LinkBlocks;
