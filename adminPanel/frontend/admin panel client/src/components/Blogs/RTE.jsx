import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import JoditEditor from "jodit-react";

const RTE = ({ name, control, label, defaultvalue = "", content="", setContent}) => {
    const editor = useRef(null)
    

  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        )}
      />
    </div>
  );
};


export default RTE;
