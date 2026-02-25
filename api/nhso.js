export default async function handler(req, res) {
  // ตั้งค่าให้หน้าเว็บของเราเรียกใช้ API ตัวนี้ได้
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // ดึงข้อมูลจาก สปสช. โดยส่ง Header จำลองว่าเป็นเบราว์เซอร์ Google Chrome ของจริง
    const response = await fetch('https://liffquota.nhso.go.th/api/citizen/services', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': 'https://liffquota.nhso.go.th/'
      }
    });

    // ถ้าโดนบล็อกอีก ให้โยน Error ออกไป
    if (!response.ok) {
      throw new Error(`สปสช. ตอบกลับด้วยรหัส: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
    
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: error.message });
  }
}
