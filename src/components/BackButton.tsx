import Image from "next/image";
import Link from "next/link";

export const BackButton = ({
  to,
  action,
}: {
  to?: string;
  action?: () => void;
}) => {
  return to ? (
    <Link
      href={to}
      className='text-lg text-purple mb-2 inline-flex cursor-pointer'>
      <Image src='/icons/arrow-left.svg' alt='' width={20} height={20} />
      <p className='ml-2'>Back</p>
    </Link>
  ) : (
    <div
      onClick={action}
      className='text-lg text-purple mb-2 inline-flex cursor-pointer'>
      <Image src='/icons/arrow-left.svg' alt='' width={20} height={20} />
      <p className='ml-2'>Back</p>
    </div>
  );
};
