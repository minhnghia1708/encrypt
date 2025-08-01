async function handleEncrypt() {
    const plainText = document.getElementById("plaintext")?.value?.trim();
    const passphrase = document.getElementById("passphrase")?.value?.trim();
    const apiBaseUrl = document.getElementById("apiBaseUrl")?.value?.trim();

    if (!plainText || !passphrase || !apiBaseUrl) {
        alert("Vui lòng nhập đầy đủ API URL, PlainText và PassPhrase");
        return;
    }

    const url = `${apiBaseUrl}/encrypt/${encodeURIComponent(plainText)}/${encodeURIComponent(passphrase)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();

        if (result?.succeeded) {
            document.getElementById("encryptedText").textContent = result.data || "(Chuỗi rỗng)";
            document.getElementById("ciphertext").value = result.data;
        } else {
            document.getElementById("encryptedText").textContent = "Lỗi mã hóa!";
        }
    } catch (error) {
        console.error("Encryption error:", error);
        document.getElementById("encryptedText").textContent = "Lỗi kết nối hoặc máy chủ!";
    }
}

async function handleDecrypt() {
    const cipherText = document.getElementById("ciphertext")?.value?.trim();
    const passphrase = document.getElementById("passphrase")?.value?.trim();
    const apiBaseUrl = document.getElementById("apiBaseUrl")?.value?.trim();

    if (!cipherText || !passphrase || !apiBaseUrl) {
        alert("Vui lòng nhập đầy đủ API URL, CipherText và PassPhrase");
        return;
    }

    const url = `${apiBaseUrl}/decrypt/${encodeURIComponent(cipherText)}/${encodeURIComponent(passphrase)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();

        if (result?.succeeded) {
            document.getElementById("decryptedText").textContent = result.data || "(Chuỗi rỗng)";
        } else {
            document.getElementById("decryptedText").textContent = "Lỗi giải mã!";
        }
    } catch (error) {
        console.error("Decryption error:", error);
        document.getElementById("decryptedText").textContent = "Lỗi kết nối hoặc máy chủ!";
    }
}