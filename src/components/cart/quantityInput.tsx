'use clien'

import React from "react";
import MinusIcon from "../icons/minus";
import PlusIcon from "../icons/plus";

type QuantityInputProps = {
  quantity: number;
};

const QuantityInput = ({ quantity }: QuantityInputProps) => {
  const handleClick = (target: string) => {
    console.log('target', target)
  };

  return (
    <div className="flex justify-around border-solid border-2 border-gray-400 rounded-lg w-[80px] h-[35px] items-center">
      <button
        onClick={() => handleClick("minus")}
        className="h-full border-solid border-r-2 border-gray-400 pr-[5px]"
      >
        <MinusIcon className="w-[16px] h-[16x]" />
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => handleClick("plus")}
        className="h-full border-solid border-l-2 border-gray-400 pl-[5px]"
      >
        <PlusIcon className="w-[16px] h-[16x]" />
      </button>
    </div>
  );
};

export default QuantityInput;
