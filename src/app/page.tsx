import { Heading } from "@/components/ui/heading";

export default function Home() {
  return (
    <div className='line-y mt-12 grid gap-x-10 sm:mt-20 lg:mt-24 lg:grid-cols-[3fr_2fr]'>
      <div className='px-4 py-2 sm:px-2'>
        <Heading level={1}>Hello World</Heading>
      </div>
    </div>
  );
}
