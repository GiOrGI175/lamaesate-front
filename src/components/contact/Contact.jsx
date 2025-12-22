import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './contact.scss';

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: '123, Avenue, Cl',
  },
  {
    icon: FaPhoneAlt,
    label: 'Phone',
    value: '+0123456789',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'estateInfo@gmail.com',
  },
];

const Contact = () => {
  return (
    <section className='contactSection'>
      <div className='textBox'>
        <p>We are always here to help</p>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

      <div className='infoBox'>
        {contactInfo.map((item, i) => {
          const Icon = item.icon;

          return (
            <div className='infoItem' key={i}>
              <div className='icon'>
                <Icon />
              </div>
              <div>
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Contact;
