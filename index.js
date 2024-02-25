// 導入 Web3.js 和智能合約 ABI
const Web3 = require('web3');
const contractABI = require('./contractABI.json'); // 替換為你的智能合約 ABI

// 創建 Web3 實例
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'); // 替換為你的 Infura 項目 ID

// 智能合約地址
const contractAddress = '0x123...'; // 替換為你的智能合約地址

// 使用智能合約 ABI 和地址創建智能合約實例
const contract = new web3.eth.Contract(contractABI, contractAddress);

// 獲取投票主題和選項
async function getTopics() {
    try {
        // 調用智能合約方法獲取投票主題和選項
        const topics = await contract.methods.getTopics().call();
        console.log('Topics:', topics);
        return topics;
    } catch (error) {
        console.error('Error getting topics:', error);
    }
}

// 投票
async function vote(topicId, optionId) {
    try {
        // 調用智能合約方法進行投票
        const result = await contract.methods.vote(topicId, optionId).send({ from: 'YOUR_ETH_ADDRESS' }); // 替換為你的以太坊地址
        console.log('Vote successful:', result);
    } catch (error) {
        console.error('Error voting:', error);
    }
}

// 獲取投票結果
async function getResults(topicId) {
    try {
        // 調用智能合約方法獲取投票結果
        const results = await contract.methods.getResults(topicId).call();
        console.log('Results:', results);
        return results;
    } catch (error) {
        console.error('Error getting results:', error);
    }
}

// 主函數
async function main() {
    // 獲取投票主題和選項
    const topics = await getTopics();
    console.log('Topics:', topics);

    // 投票
    await vote(0, 1); // 替換為你要投票的主題 ID 和選項 ID

    // 獲取投票結果
    const results = await getResults(0); // 替換為你要查詢的主題 ID
    console.log('Results:', results);
}

// 運行主函數
main();
