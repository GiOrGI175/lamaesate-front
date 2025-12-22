import './footer.scss';

const footerData = [
  {
    title: 'Customer Service',
    links: [
      'Help center',
      'Payment methods',
      'Contact',
      'Shipping status',
      'Complaints',
    ],
  },
  {
    title: 'Legal',
    links: [
      'Privacy Policy',
      'Cookie settings',
      'Terms & conditions',
      'Cancelation',
      'Imprint',
    ],
  },
  {
    title: 'Others',
    links: ['Our teams', 'Sustainability', 'Press', 'Jobs', 'Newsletter'],
  },
];

const Footer = () => {
  return (
    <footer className='footerContainer'>
      <div className='logoContainer'>
        <div className='logo'>
          <img src='/logo.png' alt='logo' />
          <span>LamaEstate</span>
        </div>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          doloribus a quaerat tempora praesentium nihil quae voluptatum, non
          maxime rem ipsam, harum quibusdam.
        </span>
      </div>
      <div className='linksContainer'>
        {footerData.map((col, i) => (
          <div className='footerCol' key={i}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((link, idx) => (
                <li key={idx}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
