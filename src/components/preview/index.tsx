import { Frame } from "./frame";
import { Messaging } from "./svg/messaging";

export const Preview = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Frame>
        {/* <ConsentWelcome /> */}
        <Messaging />
      </Frame>
    </div>
  );
};
