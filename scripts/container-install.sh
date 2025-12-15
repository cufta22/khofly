# Build images from Dockerfiles
cd ~/khofly/web
podman build -t localhost/khofly-web:latest .
cd ~/khofly/api
podman build -t localhost/khofly-api:latest .
cd ~/khofly/pv
podman build -t localhost/khofly-pv:latest .

# Reload systemd to pick up quadlet files
systemctl --user daemon-reload

# Additional stuff podman needs
sudo apt install passt uidmap
# List images
podman images
# Remove dangling images
podman images prune

# Start services (systemd generates the actual service files from quadlets)
systemctl --user start khofly-web.service
systemctl --user start khofly-api.service
systemctl --user start khofly-pv.service

# Enable auto-start on boot
systemctl --user enable khofly-web.service
systemctl --user enable khofly-api.service
systemctl --user enable khofly-pv.service

# Make services persist when logged out
# id - to get user id
sudo loginctl enable-linger $USER