        let displayValue = '0';
        let firstOperand = null;
        let operator = null;
        let waitingForSecondOperand = false;

        function updateDisplay() {
            document.getElementById('display').value = displayValue;
        }

        function clearDisplay() {
            displayValue = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }

        function addToDisplay(value) {
            if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(displayValue);
                } else if (operator) {
                    const result = performCalculation();
                    displayValue = String(result);
                    firstOperand = result;
                }
                operator = value;
                waitingForSecondOperand = true;
            } else {
                if (waitingForSecondOperand) {
                    displayValue = value;
                    waitingForSecondOperand = false;
                } else {
                    displayValue = displayValue === '0' ? value : displayValue + value;
                }
            }
            updateDisplay();
        }

        function performCalculation() {
            const secondOperand = parseFloat(displayValue);
            if (operator === '+') return firstOperand + secondOperand;
            if (operator === '-') return firstOperand - secondOperand;
            if (operator === '*') return firstOperand * secondOperand;
            if (operator === '/') return firstOperand / secondOperand;
            return secondOperand;
        }

        function calculate() {
            if (operator && firstOperand !== null) {
                const result = performCalculation();
                displayValue = String(result);
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = false;
                updateDisplay();
            }
        }

        function validateForm(event) {
            event.preventDefault();
            
            let isValid = true;
            
            document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
            document.getElementById('successMessage').style.display = 'none';

            const nome = document.getElementById('nome').value.trim();
            if (nome.length < 3) {
                document.getElementById('nomeError').style.display = 'block';
                isValid = false;
            }
            
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            const telefone = document.getElementById('telefone').value.trim();
            if (telefone.length < 9 || !/^\d+$/.test(telefone)) {
                document.getElementById('telefoneError').style.display = 'block';
                isValid = false;
            }
            
            const assunto = document.getElementById('assunto').value;
            if (assunto === '') {
                document.getElementById('assuntoError').style.display = 'block';
                isValid = false;
            }
            
            const mensagem = document.getElementById('mensagem').value.trim();
            if (mensagem.length < 10) {
                document.getElementById('mensagemError').style.display = 'block';
                document.getElementById('mensagemError').textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
                isValid = false;
            }
            
            if (isValid) {
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('contactForm').reset();
                document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
            }
            
            return false;
        }

        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });