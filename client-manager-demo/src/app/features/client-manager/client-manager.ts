import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

interface Client {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-client-manager',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './client-manager.html',
  styleUrl: './client-manager.scss'
})
export class ClientManager {
  clients: Client[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive' }
  ];

  nextId = 3;

  filterText = '';

  newClient: Partial<Client> = {
    name: '',
    email: '',
    status: 'Active'
  };

  get filteredClients(): Client[] {
    const t = this.filterText.trim().toLowerCase();
    if (!t) return this.clients;

    return this.clients.filter(c =>
      c.name.toLowerCase().includes(t) ||
      c.email.toLowerCase().includes(t) ||
      c.status.toLowerCase().includes(t)
    );
  }

  addClient(): void {
    if (!this.newClient.name || !this.newClient.email) return;

    this.clients.push({
      id: this.nextId++,
      name: this.newClient.name,
      email: this.newClient.email,
      status: this.newClient.status as 'Active' | 'Inactive'
    });

    this.newClient = { name: '', email: '', status: 'Active' };
  }

  deleteClient(id: number): void {
    this.clients = this.clients.filter(c => c.id !== id);
  }
}