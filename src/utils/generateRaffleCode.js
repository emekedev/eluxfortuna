const generateRaffleCode = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `RF-${random}`;
};

export default generateRaffleCode;