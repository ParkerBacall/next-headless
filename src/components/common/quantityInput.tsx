'use client'

import React from "react";
import MinusIcon from "../icons/minus";
import PlusIcon from "../icons/plus";

type QuantityInputProps = {
  handleQuantityUpdate: any;
  isPlusDisabled: boolean;
  isMinusDisabled: boolean;
  quantity: number;
  item?: any;
};

const QuantityInput = ({ handleQuantityUpdate, quantity, isPlusDisabled, isMinusDisabled, item }: QuantityInputProps) => {
  
  const handleClick = (target: string) => {
    if (item) {
     handleQuantityUpdate(target, quantity, item);
  } else {
    handleQuantityUpdate(target, quantity);
  }
}

  return (
    <div className="flex justify-around border-solid border-2 border-gray-400 rounded-lg w-[80px] h-[35px] items-center">
      <button
        onClick={() => handleClick('minus')}
        disabled={isMinusDisabled}
        className={`${isMinusDisabled && 'text-gray-400'} h-full border-solid border-r-2 border-gray-400 pr-[5px]`}
      >
        <MinusIcon className="w-[16px] h-[16x]" />
      </button>
      <span>{quantity}</span>
      <button
        disabled={isPlusDisabled}
        onClick={() => handleClick('plus')}
        className={`${isPlusDisabled && 'text-gray-400'} h-full border-solid border-l-2 border-gray-400 pl-[5px]`}
      >
        <PlusIcon className="w-[16px] h-[16x]" />
      </button>
    </div>
  );
};

export default QuantityInput;
