// @ts-ignore: image module declaration not found in project
import mountain from '../assets/killjaro.jpg';

const Motivation = () => {
  return (
    <div className="motivation-container">
      <h2>What drives me?</h2>
      <p>
        My motivation stems from a deep-seated passion for continuous learning and personal growth. 
        I thrive on challenges that push me beyond my comfort zone, allowing me to discover new strengths 
        and capabilities. The journey of overcoming obstacles and achieving goals fuels my enthusiasm and 
        keeps me motivated to strive for excellence in all aspects of my life.
      </p>
      <img src={mountain} alt="Mountain Climb" className="motivation-image" />
    </div>
  );
}