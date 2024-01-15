import { GuestProps } from './types';

type FooterProps = {
  invaiteList: GuestProps[];
};

function Footer({ invaiteList }: FooterProps) {
  if (!invaiteList.length) return <h5>Statrt adding your guests</h5>;
  return (
    <h4>
      you have {invaiteList.length} contacts, and{' '}
      {invaiteList.filter((el) => el.invaite).length} of them you want to
      invaite.
    </h4>
  );
}

export default Footer;
