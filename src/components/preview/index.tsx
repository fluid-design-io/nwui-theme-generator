import { PreviewDropDown } from "./dropdown";
import { Frame } from "./frame";
import { PreviewScreens } from "./screens";

export const Preview = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <PreviewDropDown />
      <Frame>
        <PreviewScreens />
      </Frame>
    </div>
  );
};
