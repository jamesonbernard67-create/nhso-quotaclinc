export default async function handler(req, res) {
  // อนุญาตให้หน้าเว็บของเราเรียกใช้ API ตัวนี้ได้
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // เปลี่ยน Method เป็น POST และแนบ Cookie ตามที่ระบบจริงต้องการ
    const response = await fetch('https://liffquota.nhso.go.th/api/citizen/services', {
      method: 'POST', // เปลี่ยนจาก GET เป็น POST
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json', // แจ้งว่าเป็นข้อมูลแบบ JSON
        // นำ Cookie ที่คุณหามาได้ ใส่เป็นบัตรผ่านประตู
        'Cookie': 'LIFF_STORE:expires:1654412393-QTAwCDJ1=1772002150614; NSXLB.08e66a20-88b5-4993-b298-52bdcec3f081.2c4bdfdf-08be-4219-a853-800d0458e6fc=q/KTDJUf+V9Dw8iEVW8kx/zJvQqaPEXrZg4hsuUf//qRgRisEYTW0meebv/nxCJLnCmyzzMg7+ScaASm3J2iyw==; app_session=b9db052b-7892-4a4c-a216-f7f99d68102f',
        'Referer': 'https://liffquota.nhso.go.th/'
      },
      // ส่งข้อมูลว่างๆ ไป (API แบบ POST มักจะต้องการ Body แม้จะไม่มีอะไรส่งไปก็ตาม)
      body: JSON.stringify({}) 
    });

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
