<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\SendEmailEvent;
use App\Mail\SendEmail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class SendEmailListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SendEmailEvent $event): void
    {
        //
        sleep(5);   // Simulate a delay of 5 seconds

        // Send the email
        Mail::to($event->user->email)->send(new SendEmail($event->user));

    }
}
