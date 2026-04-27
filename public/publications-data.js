// publications-data.js
const publicationsData = {
    "2025": [
        {
            title: "Effect of Weak Measurement Reversal on Quantum Correlations in a Correlated Amplitude Damping Channel, with a Neural Network Perspective",
            journal: "Phys. Scr. 100, 075120 (2025)",
            authors: "Venkat Abhignan, Bidyut Bikash Boruah, R. Srikanth, Ashutosh Singh",
            impact: "2.90 (IOP Publishing)",
            tags: ["Quantum Correlations", "Neural Network", "Amplitude Damping"],
            link: "https://doi.org/10.1088/1402-4896/ade1b2"
        },
        {
            title: "Twin-field-based multi-party quantum key agreement",
            journal: "J. Opt. Soc. Am. B 42, 267-279 (2025)",
            authors: "Venkat Abhignan, R Srikanth",
            impact: "1.80 (Optica Publishing Group)",
            tags: ["Quantum Key", "Multi-party", "Twin-field"],
            link: "https://doi.org/10.1364/JOSAB.541759"
        },
        {
            title: "Randomness in quantum random number generator from vacuum fluctuations with source-device independence",
            journal: "Appl. Phys. B 131, 111 (2025)",
            authors: "Megha Shrivastava, Mohit Mittal, Isha Kumari, Venkat Abhignan",
            impact: "2.00 (Springer Nature)",
            tags: ["Quantum Randomness", "Vacuum Fluctuations", "Device Independence"],
            link: "https://doi.org/10.1007/s00340-025-08471-6"
        },
        {
            title: "Quasiperiodic arrangement of magnetodielectric 𝛿-plates: Green's functions and Casimir energies for 𝑁 bodies",
            journal: "Phys. Scr. 100, 045006 (2025)",
            authors: "Venkat Abhignan",
            impact: "2.90 (IOP Publishing)",
            tags: ["Casimir Energy", "Magnetodielectric", "Green's Functions"],
            link: "https://doi.org/10.1088/1402-4896/adb815"
        },
        {
            title: "Casimir energy for 𝑁 constant conductivity 𝛿-plates with a neural network perception",
            journal: "Eur. Phys. J. Plus 140, 491 (2025)",
            authors: "Venkat Abhignan",
            impact: "2.80 (Springer Nature)",
            tags: ["Casimir Energy", "Neural Network", "Conductivity"],
            link: "https://doi.org/10.1140/epjp/s13360-025-06436-4"
        }
    ],
    "2024": [
        {
            title: "Simulations of distributed-phase-reference quantum key distribution protocols",
            journal: "Phys. Scr. 99, 105131 (2024)",
            authors: "Venkat Abhignan, Abhishek Jamunkar, Gokul Nair, Mohit Mittal, Megha Shrivastava",
            impact: "2.90 (IOP Publishing)",
            tags: ["Quantum Key", "Phase-Reference", "Simulations"],
            link: "https://doi.org/10.1088/1402-4896/ad7ade"
        },
        {
            title: "Neural network analysis in detection imperfections of continuous-variable quantum key distribution",
            journal: "2024 IEEE International Conference on Advanced Networks and Telecommunications Systems (ANTS)",
            authors: "Venkat Abhignan, Mohit Mittal, Megha Shrivastava, Abhijit Mitra",
            impact: "IEEE Conference Proceedings",
            tags: ["Neural Network", "Quantum Key", "Imperfections"],
            link: "https://doi.org/10.1109/ANTS63515.2024.10898923",
            isConference: true
        }
    ]
};

function renderPublications(containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    let count = 0;
    
    for (const [year, publications] of Object.entries(publicationsData)) {
        if (limit && count >= limit) break;
        
        // For resources page, we don't group by year
        if (containerId === 'publications-container') {
            html += `<h2 class="text-2xl font-bold text-taqbit-text mb-8 publication-year">${year}</h2>`;
        }
        
        html += `<div class="grid md:grid-cols-2 gap-8">`;
        
        for (const pub of publications) {
            if (limit && count >= limit) break;
            
            html += `
                <div class="card-hover-effect bg-taqbit-card p-6 rounded-xl shadow-md border border-gray-200">
                    <div class="flex items-start mb-4">
                        <div class="w-12 h-12 rounded-lg taqbit-primary bg-opacity-10 flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas ${pub.isConference ? 'fa-file-alt' : 'fa-book-open'} text-lg taqbit-text-primary"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-taqbit-text mb-1">${pub.title}</h3>
                            <p class="text-sm text-taqbit-text-light mb-2">${pub.journal}</p>
                            <div class="flex flex-wrap gap-2 mb-3">
                                ${pub.tags.map(tag => 
                                    `<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">${tag}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                    <p class="text-taqbit-text-light mb-4">Authors: ${pub.authors}</p>
                    <div class="flex justify-between items-center">
                        <div class="text-sm text-gray-500">
                            <span class="font-medium">${pub.isConference ? '' : 'Impact Factor:'}</span> ${pub.impact}
                        </div>
                        <div class="flex space-x-3">
                            <a href="${pub.link}" class="text-blue-600 hover:text-blue-800" title="View Publication" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                            <a href="#" class="text-blue-600 hover:text-blue-800" title="Cite">
                                <i class="fas fa-quote-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            count++;
        }
        
        html += `</div>`;
    }
    
    container.innerHTML = html;
}
function filterPublications(data, filters) {
    return data.filter(pub => {
        const matchesSearch = !filters.searchTerm || 
            pub.title.toLowerCase().includes(filters.searchTerm) || 
            pub.abstract.toLowerCase().includes(filters.searchTerm);
            
        const matchesYear = filters.year === 'all' || pub.year === filters.year;
        const matchesType = filters.type === 'all' || pub.type === filters.type;
        const matchesTopic = filters.topic === 'all' || pub.topics.includes(filters.topic);
        
        return matchesSearch && matchesYear && matchesType && matchesTopic;
    });
}