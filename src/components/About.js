import styles from "../styles/About.module.css";
import BodyText from "./BodyText";
import Typography from "./Typography";

export default function About(props) {
  return (
    <section
      {...{ ...props, className: `${props.className} ${styles.container}` }}
    >
      <Typography variant="h2">About Me:</Typography>
      <BodyText className={styles.body}>
        <Typography variant="p">
          I was in high school when I executed my first line of code. It wasn't
          much, but it sparked a fire in me that hasn't gone away. Since writing
          that first line of code, I have built projects in multiple domains
          including front end development, back end development, and even
          robotics and video games.{" "}
          <strong>
            For me, programming isn't just a profession. It's my passion.
          </strong>
        </Typography>
        <Typography variant="p">
          One thing that sets me apart is that{" "}
          <strong>I spent 4 years as a musician in the Marine Band</strong>.
          Music is a lot like software engineering. Both are forms of creativity
          and self-expression, not just in the final product, but in the process
          as well. Writing maintainable, scalable, readable code is my priority
          when programming, and it results in a smoother process and easier
          maintenance.
        </Typography>
        <Typography variant="p">
          Being a musician taught me to{" "}
          <strong>consider the audience and their experience</strong> with my
          product. Who is using this product? What kind of experience am I
          trying to shape for them? What kind of impression will they leave
          with, and what can I do to improve that next time?
        </Typography>
        <Typography variant="p">
          While I specialize in building front-end solutions,{" "}
          <strong>I am experienced everywhere on the stack</strong> and am
          comfortable solving any solution that comes my way. I have programmed
          robots, websites, games, and more. With solving such a diverse set of
          problems, I have built a big toolbox to solve anything that comes my
          way.
        </Typography>
        <Typography variant="p">
          I am constantly learning and experimenting. Never bored.
        </Typography>
      </BodyText>
    </section>
  );
}
