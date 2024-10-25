function formatDate(dateString) {
    // Tạo đối tượng Date từ chuỗi
    const date = new Date(dateString);

    // Tạo mảng chứa tên tháng
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Lấy các phần của ngày
    const month = monthNames[date.getMonth()]; // Lấy tháng (0-11)
    const day = date.getDate(); // Lấy ngày (1-31)
    const year = date.getFullYear(); // Lấy năm (YYYY)

    // Trả về định dạng mong muốn
    return `${month} ${day}, ${year}`;
}

export default formatDate