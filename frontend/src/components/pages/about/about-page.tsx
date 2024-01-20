import { motion } from "framer-motion";
const AboutPage = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="max-w-2xl flex m-auto">
      <p className="text-muted-foreground text-left w-full h-full text-lg m-auto mt-12">
        <hr className="my-4" />
        Welcome to "Hamro Aawaj," a groundbreaking initiative dedicated to
        fostering sustainable development and positive change within our
        communities. As we navigate the complexities of the modern world, it has
        become increasingly apparent that a collaborative and citizen-centric
        approach is essential to address the challenges hindering our progress.
        <hr className="my-4" />
        Our Mission At the core of "Hamro Aawaj" is our commitment to
        facilitating sustainable development by providing a platform that
        empowers citizens to voice their concerns, contribute to positive
        change, and hold responsible bodies accountable. We believe in creating
        a space where every individual's perspective matters and can contribute
        to the collective well-being of our society. Our platform operates on a
        simple yet powerful premise. Citizens can use "Hamro Aawaj" to report
        community issues, tag relevant authorities, and engage in a transparent
        and accountable problem-solving process. By leveraging technology, we
        bridge the gap between citizens and responsible bodies, fostering a
        sense of shared responsibility for the betterment of our communities.
        <hr className="my-4" />
      </p>
    </motion.div>
  );
};
export default AboutPage;
