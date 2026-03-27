document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enrollmentForm');
    const list = document.getElementById('studentList');
    let students = JSON.parse(localStorage.getItem('labData')) || [];

    const updateUI = () => {
        list.innerHTML = students.map((s, i) => `
            <tr>
                <td>#${i + 1}</td>
                <td>${s.name}</td>
                <td>${s.course}</td>
                <td><button onclick="remove(${i})" class="btn-del" aria-label="Delete ${s.name}">Delete</button></td>
            </tr>
        `).join('');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('studentName').value;
        const course = document.getElementById('course').value;

        if (name && course) {
            students.push({ name, course });
            localStorage.setItem('labData', JSON.stringify(students));
            updateUI();
            form.reset();
        } else {
            alert("Please fill all fields for the Accessibility Audit.");
        }
    });

    window.remove = (i) => {
        students.splice(i, 1);
        localStorage.setItem('labData', JSON.stringify(students));
        updateUI();
    };

    updateUI();
});
