Tên lớp: PTUDWNC-TH2016/3

Tên sinh viên: Nguyễn Xuân Nghiêm

MSSV: 1612427

Bài tập: IA02 - Web dịch Pháp-Việt

  Sinh viên sử dụng 2 api trong IA01
  👉 api dịch Pháp - Anh
  👉 api dịch Anh - Việt

  để xây dựng ứng dụng Web hỗ trợ dịch Pháp - Việt.

  👉 Cách chạy phần mềm:
  Khi ta đang đứng ở thư mục `1612427-IA01`
    1. Run 2 API:
      a. Pháp - Anh: `cd ./Phap-Anh`, `npm i`, `npm start`
      b. Anh - Việt: `cd ./Anh-Viet`, `npm i`, `npm start`
    2. Run FrontEnd Pháp - Việt:
      `cd ./Phap-Viet_Front-end`, `npm i`, `npm start`
    3. Mở trình duyệt với đường dẫn sau: http://localhost:8080/ và sử dụng

  👉 CƠ CHẾ HOẠT ĐỘNG:
    step 1: Kiểm tra hoạt động của 2 API, nếu có sự cố thì hiện modal báo lỗi (có chi tốn vài giây để thực hiện).
    step 2: Tìm tất cả các từ có liên quan (1:n) tới keyword được truyền vào với API Pháp - Anh.
    step 3: 
      - Dùng tất cả các từ tìm được ở step-2 để tìm chính xác (1:1) với với API Anh- Việt.
      - Nếu tìm được thì cộng dồn kết quả và xuất ra, nếu không thì hiển thị `chưa rõ` kèm với kết quả Tiếng Anh ở API Pháp - Anh.

* Truy cập link git sau để tham khảo các hình ảnh chính của app.