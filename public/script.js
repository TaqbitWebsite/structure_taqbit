function loadIncludes() {
    fetch('header.html')
        .then(res => res.text())
        .then(data => document.getElementById('header-placeholder').innerHTML = data);

    fetch('footer.html')
        .then(res => res.text())
        .then(data => document.getElementById('footer-placeholder').innerHTML = data);
}

// Run after page loads
window.addEventListener('DOMContentLoaded', loadIncludes);

