import { PreviewDropDown } from "./dropdown";
import { Frame } from "./frame";
import { PreviewScreens } from "./screens";

export const Preview = () => {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center">
      <PreviewDropDown />
      <Frame>
        <PreviewScreens />
      </Frame>
    </div>
  );
};
