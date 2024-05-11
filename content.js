function toggleAnnouncementVisibility() {
  const announcementElement = document.querySelector(
    'div[data-test="announcements"]'
  );
  if (announcementElement) {
    const currentDisplay = window.getComputedStyle(announcementElement).display;
    console.log(`currentDisplay: ${currentDisplay}`);
    announcementElement.classList.toggle('visible');
  }
  const checkbox = document.getElementById('toggleAnnouncements');
  const toggleInnerSpan = document.querySelector(
    '#toggleAnnouncements + span span'
  );
  const toggleOuterSpan = document.querySelector('#toggleAnnouncements + span');
  if (checkbox.checked) {
    toggleInnerSpan.style.left = '16px';
    toggleOuterSpan.style.backgroundColor = 'green';
  } else {
    toggleInnerSpan.style.left = '2px';
    toggleOuterSpan.style.backgroundColor = '#ccc';
  }
}

function createToggleSwitch() {
  const container = document.querySelector('.container');
  const toggleSwitch = document.createElement('label');
  toggleSwitch.classList.add('announcementToggle');

  toggleSwitch.innerHTML = `
    <span style="font-size: 14px;font-weight: 300;">Show Announcements</span>  
    <input type="checkbox" id="toggleAnnouncements" style="display: none;">
    <span style="position: relative; display: inline-block; width: 34px; height: 20px; background-color: #ccc; border-radius: 20px;">
      <span style="position: absolute; left: 2px; top: 2px; width: 16px; height: 16px; border-radius: 50%; background-color: white; transition: all 0.2s;"></span>
    </span>
  `;

  container.prepend(toggleSwitch);

  const checkbox = toggleSwitch.querySelector('#toggleAnnouncements');
  checkbox.addEventListener('change', toggleAnnouncementVisibility);
  checkbox.checked = false;
}

if (document.querySelector('.container')) {
  createToggleSwitch();
}

function waitForElement() {
  const observer = new MutationObserver((mutations, obs) => {
    for (let mutation of mutations) {
      for (let addedNode of mutation.addedNodes) {
        if (addedNode.nodeType === 1 && (addedNode.classList.contains('container') || addedNode.querySelector('.container'))) {
          const container = addedNode.classList.contains('container') ? addedNode : addedNode.querySelector('.container');
          const toggleSwitch = createToggleSwitch();
          container.prepend(toggleSwitch);
          obs.disconnect();
          return;
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

document.addEventListener('DOMContentLoaded', waitForElement);
