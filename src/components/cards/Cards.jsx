import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import styles from './Cards.module.css';

function CardExample() {
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: '12rem', height: '12rem', border: '2px black solid'}}>
        <Card.Img variant="top" src="https://swiftbr.vteximg.com.br/arquivos/ids/202222-636-636/622039-pao-frances-480g_1.jpg?v=638670373287330000" height={250}/>
        <br />
        <Card.Body id={styles.divPrinc}>
          <Card.Title>Pão Francês</Card.Title>
          <Card.Text id={styles.descricao}>
            Prática linha de pães congelados que traz o sabor das padarias direto para sua casa! Pães macios, crocantes, fresquinhos e muito práticos, prontos em apenas 6 minutos. O Pão Francês Swift é ideal para o dia a dia.
          </Card.Text>
          <Button variant="primary" id={styles.btn}>Adicionar ao carrinho</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardExample;