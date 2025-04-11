  import { useState, useRef } from "react";
  import { useNavigate } from "react-router-dom";
  import style from "./Cadastro.module.css";
  import Form from "react-bootstrap/Form";
  import Button from "react-bootstrap/Button";
  import Swal from "sweetalert2";
  import logo from '../../assets/logo/logo_branco_puro.png';

  function Cadastro() {
    const [etapa, setEtapa] = useState(1);
    const emailRef = useRef(null);
    const senhaRef = useRef(null);
    const nomeRef = useRef(null);
    const sobrenomeRef = useRef(null);
    const [dados, setDados] = useState({
      email: "",
      senha: "",
      nome: "",
      sobrenome: ""
    });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
      setDados({ ...dados, [e.target.name]: e.target.value });
    };

    // Função para validar se o campo foi preenchido corretamente
    const validarCampo = (campoRef) => {
      if (campoRef.current && !campoRef.current.value.trim()) {
        campoRef.current.setCustomValidity("Por favor, preencha este campo");
        campoRef.current.reportValidity();
        return false;
      } else if (campoRef.current) {
        campoRef.current.setCustomValidity("");
      }
      return true;
    };

    const setEtapaUm = () => {
      setEtapa(1);
    };

    const setEtapaTres = () => {
      setEtapa(3);
    };


    const handleSubmit = async (e) => {
      e.preventDefault();

      let isValid = true;

      isValid = validarCampo(emailRef) && isValid;

      isValid = validarCampo(senhaRef) && isValid;

      // Só verifica os campos nome e sobrenome se estiver na etapa 2
      if (etapa === 2) {
        isValid = validarCampo(nomeRef) && isValid;
        isValid = validarCampo(sobrenomeRef) && isValid;
      }

      if (isValid) {
        if (etapa === 1) {
          setEtapa(2);
        } else if (etapa === 2) {
          const email = dados.email;
          const senha = dados.senha;
          const nome = dados.nome;
          const sobrenome = dados.sobrenome;
          const requestBody = {
            email: email,
            senha: senha,
            nome: nome,
            sobrenome: sobrenome
          };

          try {
            const response = await fetch(
              "https://back-end-u0qf.onrender.com/user/create_user",
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(requestBody),
              }
            );

            let result;
            try {
              result = await response.clone().json(); // Tenta converter para JSON
            } catch {
              result = { message: await response.text() }; // Caso não seja JSON, lê como texto
            }

            if (response.status === 201) {
              localStorage.setItem("id", dados.email); // Salva o ID do usuário
              localStorage.setItem("saldo", (result.saldo*1))
            
              Swal.fire({
                icon: "success",
                title: "Cadastro realizado!",
                text: "Seu cadastro foi concluído com sucesso.",
                confirmButtonColor: "#652A0E",
              });
              navigate("/produtos");
            } else if (response.status === 409) {
              Swal.fire({
                icon: "error",
                title: "Erro!",
                text: result.message,
                confirmButtonColor: "#d33",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Erro!",
                text: error.message,
                confirmButtonColor: "#d33",
              });
            }
            
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Erro na requisição!",
                text: error.message,
                confirmButtonColor: "#d33",
              });
            }
        } else {
          const email = dados.email;
          const senha = dados.senha;
          const requestBody = {
            email: email,
            senha: senha
          };

          try {
            const response = await fetch(
              "https://back-end-u0qf.onrender.com/user/login",
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(requestBody),
              }
            );

            let result;
            try {
              result = await response.clone().json(); // Tenta converter para JSON
            } catch {
              result = { message: await response.text() }; // Caso não seja JSON, lê como texto
            }

            if (response.status === 200) {
              localStorage.setItem("id", dados.email);
              localStorage.setItem("saldo", (result.saldo*1).toFixed(2))

              Swal.fire({
                icon: "success",
                title: "Login realizado com sucesso!",
                showConfirmButton: false,
                timer: 2000, // Fecha sozinho depois de 2s
              });
              localStorage.setItem('registered', 'true');
              navigate("/produtos");
            } else {
              Swal.fire({
                icon: "error",
                title: "Erro no login",
                text: JSON.stringify(result.message),
                confirmButtonColor: "#d33",
              });
            }
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Erro na requisição",
                text: JSON.stringify(error.message),
                confirmButtonColor: "#d33",
              });
            }
        }
      }
    };

    return (
      <container>
        <div id={style.divLogo}>
          <img
            src={logo}
            alt="logo"
            id={style.logo}
          />
        </div>
        <Form onSubmit={handleSubmit} id={style.formulario}>
          {etapa === 1 ? (
            <>
              <h1 id={style.titulo}>Bem-vindo!</h1>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                id={style.campos}
              >
                <Form.Label className={style.labels}>E-mail</Form.Label>
                <Form.Control
                  name="email"
                  value={dados.email}
                  onChange={handleChange}
                  ref={emailRef}
                  type="email"
                  placeholder="algumaCoisa@gmail.com"
                  className={style.input}
                  required
                />

                <br />

                <Form.Label className={style.labels}>Senha</Form.Label>
                <Form.Control
                  name="senha"
                  value={dados.senha}
                  onChange={handleChange}
                  ref={senhaRef}
                  type="password"
                  placeholder="Senha"
                  className={style.input}
                  required
                />
              </Form.Group>
            </>
          ) : etapa === 2 ? (
            <>
              <h1 id={style.titulo}>Bem-vindo!</h1>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                id={style.campos}
              >
                <Form.Label className={style.labels}>Nome</Form.Label>
                <Form.Control
                  name="nome"
                  value={dados.nome}
                  onChange={handleChange}
                  ref={etapa === 2 ? nomeRef : null}
                  type="text"
                  placeholder="Nome"
                  className={style.input}
                  required
                />

                <br />

                <Form.Label className={style.labels}>Sobrenome</Form.Label>
                <Form.Control
                  name="sobrenome"
                  value={dados.sobrenome}
                  onChange={handleChange}
                  ref={etapa === 2 ? sobrenomeRef : null}
                  type="text"
                  placeholder="Sobrenome"
                  className={style.input}
                  required
                />
              </Form.Group>
            </>
          ) : (
            <>
              <h1 id={style.titulo}>Login:</h1>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                id={style.campos}
              >
                <Form.Label className={style.labels}>E-mail</Form.Label>
                <Form.Control
                  name="email"
                  value={dados.email}
                  onChange={handleChange}
                  ref={emailRef}
                  type="email"
                  placeholder="algumaCoisa@gmail.com"
                  className={style.input}
                  required
                />

                <br />

                <Form.Label className={style.labels}>Senha</Form.Label>
                <Form.Control
                  name="senha"
                  value={dados.senha}
                  onChange={handleChange}
                  ref={senhaRef}
                  type="password"
                  placeholder="Senha"
                  className={style.input}
                  required
                />
              </Form.Group>
            </>
          )}

          <Button variant="primary" type="submit" id={style.botaoCadastrar}>
            {etapa === 1 ? "Cadastrar" : etapa === 2 ? "Finalizar cadastro" : "Fazer login"}
          </Button>

          <p>
            {etapa === 1
              ? <p  className={style.redirecionar} onClick={setEtapaTres}>Já possui um cadastro? <br /> Faça login clicando aqui.</p>
              : <p  className={style.redirecionar} onClick={setEtapaUm}>Não possui um cadastro? <br /> Realize seu cadastro clicando aqui.</p>}
          </p>
        </Form>
      </container>

      
    );
  }

  export default Cadastro;
