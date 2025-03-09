import { Radio, RadioGroup } from "@headlessui/react";
import { TextMono } from "../ui/text";
import { ColorPicker } from "./color-picker";

export function Palettes() {
  return (
    <>
      <RadioGroup className='line-y lg:line-y/half flex items-center'>
        <Radio
          as='div'
          value='ios'
          className='*:select-none border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-checked:bg-border/50 sm:px-6'
        >
          <TextMono>iOS</TextMono>
        </Radio>
        <Radio
          as='div'
          value='android'
          className='*:select-none border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-checked:bg-border/50 sm:px-6'
        >
          <TextMono>Android</TextMono>
        </Radio>
        <Radio
          as='div'
          value='web'
          className='*:select-none border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-checked:bg-border/50 sm:px-6'
        >
          <TextMono>Web</TextMono>
        </Radio>
      </RadioGroup>
      <div className='grid grid-cols-2 md:grid-cols-4 line-b lg:line-b/half'>
        {[
          { title: "Primary", color: "#000000" },
          { title: "Secondary", color: "#000000" },
          { title: "Accent", color: "#000000" },
          { title: "Muted", color: "#000000" },
        ].map(({ title, color }, index) => (
          <ColorPicker key={index} title={title} color={color} />
        ))}
      </div>
    </>
  );
}
