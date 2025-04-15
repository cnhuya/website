document.addEventListener('DOMContentLoaded', function() {
    const panelTitles = document.querySelectorAll('.menu h2');
    const panelContainers = document.querySelectorAll('.content-panel');

    panelTitles.forEach(title => {
        title.addEventListener('click', function() {
             panelTitles.forEach(title => {
                  title.classList.remove('selected');
              })
            panelContainers.forEach(container => {
                container.classList.remove('active');
            });

            const targetPanelClass = this.getAttribute('data-target');

            const targetPanel = document.querySelector("." + targetPanelClass);

            if (targetPanel) {
                targetPanel.classList.add('active');
                this.classList.add('selected') 
            }
        });
    });
});