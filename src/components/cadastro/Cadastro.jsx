import style from './Cadastro.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Cadastro() {
    return (
        <container>
                <div id={style.divLogo}>
                    <img src="src/assets/logo/logo_branco_puro.png" alt="logo" id={style.logo} />
                </div>
                <Form id={style.formulario}>
                <h1 id={style.titulo}>Bem-vindo!</h1>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" id={style.campos}>
                        <Form.Label className={style.labels}>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="algumaCoisa@gmail.com" className={style.input}/>
                        <br />
                        <Form.Label className={style.labels}>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" className={style.input}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" id={style.botaoCadastrar}>
                        Cadastrar
                    </Button>
                </Form>
            
        </container>
    )
}

export default Cadastro;