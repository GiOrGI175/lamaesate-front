import { useState } from 'react';
import './navbar.scss';
import { AnimatePresence, motion, spring } from 'framer-motion';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/', label: 'About' },
    { href: '/', label: 'Contact' },
    { href: '/', label: 'Agents' },
    { href: '/', label: 'Sing in' },
    { href: '/', label: 'Sing up' },
  ];

  return (
    <nav>
      <div className='left'>
        <motion.a
          href='/'
          className='logo'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          duration={{ spring: 120 }}
        >
          <img src='/logo.png' alt='logo' />
          <span>LamaEstate</span>
        </motion.a>
        {links.slice(0, -2).map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, x: -12 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: index * 0.08,
                duration: 0.28,
                type: 'spring',
                stiffness: 160,
              },
            }}
            exit={{ opacity: 0, y: -8 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            {link.label}
          </motion.a>
        ))}
      </div>
      <div className='right'>
        <a href='/'>Sing in</a>
        <a href='/' className='register'>
          Sing up
        </a>
        <div className='menuIcon' onClick={() => setOpen((pv) => !pv)}>
          <img src='/menu.png' alt='menu' />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              className='menu'
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.98 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  style={{ display: 'block' }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: index * 0.08,
                      duration: 0.28,
                      type: 'spring',
                      stiffness: 160,
                    },
                  }}
                  exit={{ opacity: 0, y: -8 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
