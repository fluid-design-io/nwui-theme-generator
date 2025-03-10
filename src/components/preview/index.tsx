import { Frame } from "./frame";
import { ConsentWelcome } from "./svg/consent-welcome";

export const Preview = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center flex-1'>
      <Frame>
        <ConsentWelcome />
      </Frame>
    </div>
  );
};
