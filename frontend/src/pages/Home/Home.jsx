import React from 'react'
import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.wrapper}>
        <h1 className={styles.title}>UNILEARN</h1>
        <div className={styles.description}>Learn Smarter. Share Better. Build Together</div>
        <div className={styles.body}>
            Unilearn is a student-built academic platform where university students share trusted course 
            materials, explore real student projects, and understand courses before taking them. It encourages 
            collaboration, transparency, and safe feedback, helping juniors learn from seniors while showcasing 
            practical work across departments and building a supportive learning community for everyone involved.
        </div>
        <div className={styles.buttons}>
            <button className={styles.button}>Get Started</button>
            <button className={styles.button}>Log In</button>
        </div>
    </div>
  )
}

export default Home