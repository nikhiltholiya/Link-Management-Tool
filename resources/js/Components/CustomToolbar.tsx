const renderOptions = (formatData: any, index: number) => {
   const { className, options } = formatData;

   return (
      <select key={index} className={className}>
         <option selected={true}></option>
         {options.map((value: any, ind: number) => {
            return <option key={ind} value={value}></option>;
         })}
      </select>
   );
};

const renderSingle = (formatData: any, index: number) => {
   const { className, value } = formatData;
   return <button key={index} className={className} value={value}></button>;
};

const CustomToolbar = () => (
   <div id="toolbar">
      {formats.map((classes, index) => {
         return (
            <span key={index} className="ql-formats">
               {classes.map((formatData: any, index) => {
                  return formatData.options
                     ? renderOptions(formatData, index)
                     : renderSingle(formatData, index);
               })}
            </span>
         );
      })}
   </div>
);

const colors = ["red", "white", "green", "blue", "orange", "violet"];
const formats = [
   [
      { className: "ql-font", options: ["serif", "monospace"] },
      { className: "ql-size", options: ["small", "large", "huge"] },
   ],
   [
      { className: "ql-bold" },
      { className: "ql-italic" },
      { className: "ql-underline" },
      { className: "ql-strike" },
   ],
   [
      { className: "ql-color", options: colors },
      { className: "ql-background", options: colors },
   ],
   [
      { className: "ql-script", value: "sub" },
      { className: "ql-script", value: "super" },
   ],
   [
      { className: "ql-header", value: "1" },
      { className: "ql-header", value: "2" },
      { className: "ql-blockquote" },
      { className: "ql-code-block" },
   ],
   [
      { className: "ql-list", value: "ordered" },
      { className: "ql-list", value: "bullet" },
      { className: "ql-indent", value: "-1" },
      { className: "ql-indent", value: "+1" },
   ],
   [
      { className: "ql-direction", value: "rtl" },
      { className: "ql-align", options: ["right", "center", "justify"] },
   ],
   [
      { className: "ql-link" },
      // { className: "ql-image" },
      // { className: "ql-video" },
      { className: "ql-formula" },
   ],
];

export default CustomToolbar;
