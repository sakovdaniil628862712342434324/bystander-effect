var audioFeedbackEnabled = false;
var lastClickedButtonId = null;
var currentSpeech = null;

document.addEventListener('DOMContentLoaded', function () {
    const tabLinks = document.querySelectorAll('.nav-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Remove 'show' and 'active' classes from all tab-panes
            tabPanes.forEach(pane => {
                pane.classList.remove('show', 'active');
            });

            // Remove 'active' class from all tab-links
            tabLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add 'show' and 'active' classes to the clicked tab-pane
            const targetPane = document.querySelector(this.getAttribute('href'));
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }

            // Add 'active' class to the clicked tab-link
            this.classList.add('active');
        });
    });
});

// Search Functionality
function searchFunction() {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');

    if (!input || !results) return; // Exit if elements don't exist

    const inputValue = input.value.toLowerCase();
    results.innerHTML = '';

    if (inputValue.length < 2) {
        results.style.display = 'none';
        return;
    }

    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(tabPane => {
        if (tabPane instanceof Element) {
            const text = tabPane.textContent.toLowerCase();
            if (text.includes(inputValue)) {
                const title = tabPane.querySelector('h1, h2, h3, h4, h5, h6, .section-header');
                if (title) {
                    const a = document.createElement('a');
                    a.href = '#';
                    a.textContent = title.textContent;
                    a.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetTabId = tabPane.id;
                        const triggerEl = document.querySelector(`a[href="#${targetTabId}"]`);
                        if (triggerEl) {
                            triggerEl.click();
                            results.innerHTML = '';
                            results.style.display = 'none';
                            input.value = '';
                        }
                    });
                    results.appendChild(a);
                }
            }
        }
    });

    results.style.display = results.children.length ? 'block' : 'none';
}

// Attach search function to input
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', searchFunction);
}

// Close search results when clicking outside
document.addEventListener('click', function (e) {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (searchInput && searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
})


document.addEventListener('DOMContentLoaded', function () {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
})

document.addEventListener('DOMContentLoaded', function () {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('#benefitsContainer, #harmsContainer');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            container.appendChild(draggable);
        });
    });

    document.getElementById('checkAnswers').addEventListener('click', () => {
        const benefits = Array.from(document.querySelectorAll('#benefitsContainer .draggable')).map(el => el.textContent);
        const harms = Array.from(document.querySelectorAll('#harmsContainer .draggable')).map(el => el.textContent);

        const correctBenefits = [
            'Enhanced understanding of human behavior',
            'Improved public safety strategies',
            'Development of effective training programs'
        ];

        const correctHarms = [
            'Potential psychological distress',
            'Ethical dilemmas due to deception',
            'Compromise of participant trust'
        ];

        const isCorrect = JSON.stringify(benefits.sort()) === JSON.stringify(correctBenefits.sort()) &&
            JSON.stringify(harms.sort()) === JSON.stringify(correctHarms.sort());

        const feedback = document.getElementById('feedback');
        if (isCorrect) {
            feedback.textContent = "Correct! You've successfully categorized the benefits and harms.";
            feedback.classList.add('alert-success');
            feedback.classList.remove('alert-danger');
        } else {
            feedback.textContent = 'Not quite right. Try again!';
            feedback.classList.add('alert-danger');
            feedback.classList.remove('alert-success');
        }
        feedback.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const responseArea = document.getElementById('responseArea');
    const additionalInfo = document.getElementById('additionalInfo');
    const checkAnswerButton = document.getElementById('checkAnswer');
    const feedbackArea = document.getElementById('feedbackArea');
    const feedbackText = document.getElementById('feedbackText');

    yesButton.addEventListener('click', function () {
        responseArea.innerHTML = "While convenience sampling made data collection easier, it's important to consider its limitations. Let's explore this further.";
        responseArea.className = "alert alert-info";
        responseArea.style.display = "block";
        additionalInfo.style.display = "block";
    });

    noButton.addEventListener('click', function () {
        responseArea.innerHTML = "You're right to be cautious. Convenience sampling has several limitations that could affect the study's validity. Let's discuss why.";
        responseArea.className = "alert alert-success";
        responseArea.style.display = "block";
        additionalInfo.style.display = "block";
    });

    checkAnswerButton.addEventListener('click', function () {
        const selectedAnswer = document.querySelector('input[name="samplingQuestion"]:checked');
        if (selectedAnswer) {
            if (selectedAnswer.id === "option3") {
                feedbackText.textContent = "Correct! The main concern with convenience sampling is that it may not be representative of the general population, which can limit the generalizability of the study's findings.";
                feedbackText.className = "alert alert-success";
            } else {
                feedbackText.textContent = "Not quite. While these could be concerns in some studies, the main issue with convenience sampling in this context is its potential lack of representativeness. Try again!";
                feedbackText.className = "alert alert-danger";
            }
            feedbackArea.style.display = "block";
        } else {
            checkAnswerButton.setAttribute('data-bs-content', 'Please select an answer before checking.');
            var popover = new bootstrap.Popover(checkAnswerButton);
            popover.show();
            setTimeout(() => popover.hide(), 3000);
        }
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('audiotracker');

    toggleSwitch.addEventListener('change', function () {
        if (toggleSwitch.value == '1') {
            audioFeedbackEnabled = true;
        } else {
            audioFeedbackEnabled = false;
            // Stop any ongoing speech
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        }
    });
});

// Add event listeners to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (event) {
        lastClickedButtonId = event.target.id;
    });
});

function readAudioAnswerPreDefined(id = null, force = false) {
    if (lastClickedButtonId == id) {
        id = "0";
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        return;
    }

    if (id.includes("-force")) {
        id = id.replace("-force", "");
    }

    if (audioFeedbackEnabled || force) {
        if (id == "0") {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        } else if (id && id != "0") {
            speakText(getTextForId(id));
        }
    }
}

function speakText(text) {
    if (!window.speechSynthesis) {
        console.warn('Speech synthesis not supported');
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (text && text.trim() !== '') {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        currentSpeech = utterance;
        window.speechSynthesis.speak(utterance);
    }
}

function getTextForId(id) {
    const textMap = {
        '1': 'Social psychologists John M. Darley and Bibb Latané conducted a groundbreaking study on the Bystander Effect in 1968. Inspired by the tragic murder of Kitty Genovese in 1964, which highlighted the perplexing lack of intervention by numerous witnesses, Darley and Latané sought to understand the underlying reasons behind such inaction.',
        '2': 'John M. Darley was an influential social psychologist known for his work on the Bystander Effect alongside Bibb Latané. Bibb Latané is a prominent social psychologist whose collaboration with John Darley led to the foundational studies on the Bystander Effect.',
        '3': 'Darley and Latané\'s primary objective was to elucidate why individuals often refrain from helping others in emergencies when others are present. They hypothesized that the presence of multiple bystanders dilutes the sense of personal responsibility.',
        '4': 'How does the number of bystanders present affect an individual\'s likelihood of helping in an emergency situation? This question serves as the cornerstone of the Bystander Effect Experiment.',
        '5': 'The study utilized an independent group design. Each participant was randomly assigned to one of several conditions that varied the number of perceived bystanders present during the simulated emergency.',
        '6': 'The independent variable was manipulated by varying the number of background voices participants heard during the simulated emergency scenario.',
        '7': 'The dependent variable was measured by the elapsed time between the onset of the emergency and the participant\'s response, such as leaving the room to seek assistance.',
        '8': 'Darley and Latané found a significant inverse relationship between the number of bystanders present and the likelihood of intervention. With more bystanders, participants were less likely to help and took longer to respond.',
        '9': 'The Bystander Effect experiment primarily involved college students recruited through convenience sampling. Most participants were young adults from similar socioeconomic and demographic backgrounds.',
        '10': 'The insights gained from the Bystander Effect Experiment have profound practical implications for public safety and emergency response protocols. The research contributes to the broader understanding of group behavior and decision-making processes.',
        '11': 'The Bystander Effect research has been pivotal in shaping how societies understand and respond to emergencies. It has led to the development of training programs and influenced public policies related to public safety.',
        '15': 'Informed consent was not fully adhered to, as participants were not informed about the true nature of the experiment to prevent biased responses.',
        '16': 'It remains unclear whether participants were explicitly informed of their right to withdraw from the study at any point.',
        '17': 'While no physical harm was inflicted, participants may have experienced psychological distress upon realizing their role in the simulated emergency.',
        '18': 'Confidentiality was likely maintained, as personal identifiers were not disclosed in the study\'s findings.',
        '19': 'It is unclear whether a comprehensive debriefing was provided to participants to explain the study\'s true purpose and alleviate any distress caused by deception.',
        '20': 'The study employed deception, as participants were misled about the number of bystanders present. This raises ethical concerns regarding participant autonomy and trust.',
        '21': 'The Bystander Effect study highlights the ongoing tension between scientific progress and ethical conduct in research. While providing valuable insights, it raised significant ethical questions.',
        '22': 'John M. Darley made significant contributions to social psychology, particularly in decision-making and ethical behavior. Bibb Latané\'s research delved deep into the mechanisms of social influence and group dynamics.',
        '23': 'In 1964, Kitty Genovese was tragically murdered in New York City. The case highlighted the mysterious phenomenon where individuals fail to act in emergencies when others are present.',
        '24': 'The murder of Kitty Genovese occurs in New York City, sparking widespread media attention and public concern over the lack of bystander intervention.',
        '25': 'John M. Darley and Bibb Latané conduct the seminal Bystander Effect Experiment, formally introducing the concept to social psychology.',
        '26': 'Further studies expand on Darley and Latané\'s work, exploring various factors that influence the Bystander Effect.',
        '27': 'Research continues to explore the nuances of the Bystander Effect in diverse contexts, including digital environments and emergency response training.',
        '28': 'In emergencies, every second counts, and your decision to act can save lives. Recognize the factors influencing inaction and commit to being a proactive community member.'
    };

    return textMap[id] || '';
}

// Track popover close events
document.addEventListener('hidden.bs.popover', function () {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
});

// Track modal close events
document.addEventListener('hidden.bs.modal', function () {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
});

// Track ESC key presses
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }
});