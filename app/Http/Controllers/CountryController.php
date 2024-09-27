<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CountryController extends Controller
{
    public function index() {
        $countries = Country::with(['states'])->get();
        return response()->json($countries, Response::HTTP_OK);
    }

    public function show($id) {
        $country = Country::findOrFail($id);
        return response()->json($country, Response::HTTP_OK);
    }

    public function update(Request $request, $id) {
        $country = Country::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'required|string'
        ]);
        $country->fill($validatedData);
        $country->save();
        return response()->json($country, Response::HTTP_OK);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string'
        ]);

        $country = Country::create($validatedData);

        return response()->json($country, Response::HTTP_OK);
    }
    public function destroy($id) {
        $country = Country::findOrFail($id);
        $country->delete();
        return response()->json(null, Response::HTTP_OK);
    }
}
