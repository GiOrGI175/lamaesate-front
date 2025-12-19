import { useEffect, useRef, useState } from 'react';
import './achievements.scss';
import CountUp from 'react-countup';
import { Award } from 'lucide-react';

const Achievements = () => {
  const statistics = [
    { label: 'Happy clients', value: 12 },
    { label: 'Different cities', value: 3 },
    { label: 'Projects completed', value: 42 },
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className='MainContainer' ref={sectionRef}>
      <div className='decoration'>
        <div className='box1' />
        <div className='box2' />
      </div>
      <div className='MainContent'>
        <div className='achievementsContainer'>
          <h2>Our Achievements</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste nulla
            voluptates nam soluta assumenda doloribus, amet, quisquam, est
            accusantium voluptatem illo magnam impedit! Cupiditate eveniet
            perspiciatis pariatur vel veritatis architecto.
          </p>
          <div className='statsContainer'>
            {statistics.map((item, index) => (
              <div key={index}>
                <div>
                  {isVisible ? (
                    <CountUp start={0} end={item.value} duration={2.5} />
                  ) : (
                    <span>0</span>
                  )}
                  <span>K+</span>
                </div>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='textContainer'>
          <div className='content'>
            <div className='imgContainer'>
              <Award size={50} strokeWidth={1.5} />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              illo earum recusandae odit, eveniet fuga? Libero quia officia
              ducimus mollitia doloremque, veritatis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
