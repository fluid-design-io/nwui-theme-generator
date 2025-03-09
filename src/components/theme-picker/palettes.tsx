import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { TabListText } from "../ui/text";

export function Palettes() {
  return (
    <TabGroup>
      <TabList className='line-y'>
        <Tab className='border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-selected:bg-border/50 sm:px-6'>
          <TabListText>iOS</TabListText>
        </Tab>
        <Tab className='border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-selected:bg-border/50 sm:px-6'>
          <TabListText>Android</TabListText>
        </Tab>
        <Tab className='border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-selected:bg-border/50 sm:px-6'>
          <TabListText>Web</TabListText>
        </Tab>
      </TabList>
      <TabPanels className='mt-4 px-4 py-2 sm:px-2'>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
