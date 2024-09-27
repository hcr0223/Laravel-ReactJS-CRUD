<?php

namespace App\Http\Controllers;

use App\Models\State;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class StateController extends Controller
{
    public function index($id) {
        $country = Country::findOrFail($id);
        $states = $country->states;

        return response()->json(compact('country','states'), Response::HTTP_OK);
    }

    public function show($id) {
        $state = State::findOrFail($id);
        $country = $state->country;

        return response()->json(compact('country','state'), Response::HTTP_OK);
    }

    public function update(Request $request, $id) {
        $state = State::findOrFail($id);
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                Rule::unique('states')->ignore($id)
            ],
            'country_id' => 'required|numeric'
        ]);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string|unique:states',
            'country_id' => 'required|numeric'
        ]);

        $state = State::create($validatedData);

        return response()->json($state, Response::HTTP_OK);
    }

    public function destroy($id) {
        $state = State::findOrFail($id);
        $state->delete();
        return response()->json(null, Response::HTTP_OK);
    }
}
