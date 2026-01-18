const sendBtn = document.getElementById('sendBtn');
const promptInput = document.getElementById('prompt');
const responseOutput = document.getElementById('response');

sendBtn.addEventListener('click', async () => {
    const prompt = promptInput.value;
    responseOutput.textContent = 'Loading...';

    try {
        const res = await fetch('http://REPLACE_WITH_POD_IP:5000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();
        responseOutput.textContent = data.response;
    } catch (err) {
        responseOutput.textContent = 'Error: ' + err;
    }
});
