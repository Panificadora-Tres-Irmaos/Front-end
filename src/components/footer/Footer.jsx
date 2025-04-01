import { FaFacebookF, FaGoogle, FaInstagram, FaGithub } from 'react-icons/fa';
import style from "./Footer.module.css";


function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <section className={style.secao}>
                    <a style={{ color: "#FEFBEA", fontSize: "1.5em"}} href="#!" role="button">
                        <FaFacebookF />
                    </a>

                    <a style={{ color: "#FEFBEA", fontSize: "1.5em"}} href="#!" role="button">
                        <FaGoogle />
                    </a>

                    <a style={{ color: "#FEFBEA", fontSize: "1.5em"}} href="#!" role="button">
                        <FaInstagram />
                    </a>

                    <a style={{ color: "#FEFBEA", fontSize: "1.5em"}} href="#!" role="button">
                        <FaGithub />
                    </a>
                </section>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: "#652A0E", color: "#FEFBEA" }}>
                © 2025 Copyright Panificadora Três Irmãos
                <a className="text-white" href="https://mdbootstrap.com/"></a>
            </div>
        </footer>
    );
}

export default Footer;
