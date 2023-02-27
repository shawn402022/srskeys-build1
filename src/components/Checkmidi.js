import { useState } from 'react'


export default function checkMidi() {

// check to see if browser accepts MIDI    

    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(success, failure)
    }

    function success(midiAccess) {
        midiAccess.onstatechange = updateDevices
        const inputs = midiAccess.inputs
        //console.log(inputs)
        //console.log(midiAccess)

        inputs.forEach((input) => {
             //console.log(input)
             input.onmidimessage = handleInput
        })
    }

    function handleInput(input) {
        const command = input.data[0]
        const note = input.data[1]
        const velocity = input.data[2]
        console.log(command, note, velocity)

        switch (command) {
            case 144: // noteOn
            if (velocity > 0) {
                noteOn(note, velocity)
            } else {
                noteOff(note)
            }
            break
            case 128:// noteOff
            noteOff(note)
                break
        } 
    }

    function noteOn(note, velocity) {
        console.log(note, velocity)
    }

    function noteOff(note) {
        console.log(note)
    }



// fire an event everytime sthe list of midi devices

    function updateDevices(event) {
        //console.log(event)
        //console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State, ${event.port.state}, Type: ${event.port.type}` )
    }



    function failure() {
        console.log('Could not connect MIDI')
    }
}

checkMidi()