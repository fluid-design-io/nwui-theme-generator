interface ColorDisplayButtonProps {
  title: string;
  color: string;
}

export const ColorDisplayButton = ({
  title,
  color,
}: ColorDisplayButtonProps) => {
  return (
    <div className='flex flex-col items-start'>
      <p className='font-mono font-medium text-base/8 uppercase tracking-wide'>
        {title}
      </p>
      <div className='flex items-center gap-1'>
        <div
          className='size-3.5 inset-ring inset-ring-border rounded-full'
          style={{ backgroundColor: color }}
        />
        <p className='font-mono font-light text-muted-foreground uppercase'>
          {color}
        </p>
      </div>
    </div>
  );
};
