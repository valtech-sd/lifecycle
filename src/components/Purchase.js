import { Select, Button, Modal, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMoralis } from "react-moralis";

const { Option } = Select;
function Purchase({ book }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delivery, setDelivery] = useState("");
  const { Moralis, account, chainId } = useMoralis();

  console.log("CHAIN ID", chainId);

  const handleOk = async () => {
    // Get The Price of WETH
    const options = {
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      chain: "eth",
    };

    const price = await Moralis.Web3API.token.getTokenPrice(options);
    console.log("PRICE", price.usdPrice);
    // const priceMatic = 50000000000000000;

    // Send this much ETH to test user
    const options1 = {
      type: "native",
      amount: Moralis.Units.ETH(0.1),
      receiver: "0x062BcE1640F79bFa7B0B79dAb0e413C54299c556",
    };
    let result = await Moralis.transfer(options1);

    result.on();

    //Save Transaction Details to DB
    const Transaction = Moralis.Object.extend("Transaction");
    const transaction = new Transaction();

    transaction.set("Customer", account);
    transaction.set("Delivery", delivery);
    transaction.set("Product", book.name);

    transaction.save();
    setIsModalVisible(false);
  };

  return (
    <>
      <span className="price"> ${book.price}</span>
      <p>No Import Fees & Free Shipping Included</p>
      <h1 style={{ color: "green" }}> In Stock </h1>
      <h3>Quantity</h3>
      <Select defaultValue={1} style={{ width: "100%" }}>
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
        <Option value={5}>5</Option>
      </Select>
      {chainId === "0x4" && (
        <Button
          className="login"
          style={{ width: "100%", marginTop: "50px" }}
          onClick={() => setIsModalVisible(true)}
        >
          <ShoppingCartOutlined /> Buy Now
        </Button>
      )}

      <Modal
        title="Purchase Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <div style={{ display: "flex" }}>
          <img src={book.image} alt="product" style={{ width: "200px" }}></img>
          <div>
            <h3>{book.name}</h3>
            <h2>${book.price}</h2>
            <h4>Delivery Address</h4>
            <Input
              onChange={(value) => setDelivery(value.target.value)}
            ></Input>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Purchase;
